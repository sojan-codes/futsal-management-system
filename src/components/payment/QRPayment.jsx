import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, QrCode, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import DocumentUploader from './DocumentUploader';
import LoadingOverlay from './LoadingOverlay';
import SuccessDialog from './SuccessDialog';
import useImageUpload from '../../hooks/useImageUpload';
import { createPayment, uploadPaymentScreenshot, verifyPayment } from '../../services/paymentService';

export default function QRPayment({ booking, onCancel, onSuccess }) {
  const screenshot = useImageUpload();
  const [busy, setBusy] = useState(false); const [progress, setProgress] = useState(0); const [done, setDone] = useState(false);
  const amount = Number(booking.amount || booking.total_amount || 0).toLocaleString();
  const reference = `FMS-${booking.id}-${String(booking.date || '').replaceAll('-', '')}`;
  const qrData = `futsalpro://payment?booking=${encodeURIComponent(booking.id)}&amount=${encodeURIComponent(booking.amount || 0)}&reference=${reference}`;
  const copyReference = async () => { await navigator.clipboard?.writeText(reference); toast.info('Transaction reference copied.'); };
  const confirm = async () => {
    if (!screenshot.file || screenshot.isPreparing) return;
    setBusy(true); setProgress(0);
    try {
      const { data: payment } = await createPayment({ booking_id: booking.id, method: 'QR' });
      const paymentReference = payment.payment_reference || payment.id;
      await uploadPaymentScreenshot(paymentReference, screenshot.file, setProgress);
      await verifyPayment(paymentReference, { method: 'QR', transaction_reference: reference });
      toast.success('Payment Submitted Successfully'); setDone(true);
    } catch (error) { toast.error(error.response?.data?.detail || 'We could not submit the payment. Please try again.'); }
    finally { setBusy(false); }
  };
  if (done) return <SuccessDialog title="Payment submitted" description="Your payment proof has been submitted for verification." onClose={onSuccess} />;
  return <section className="payment-flow qr-flow"><button className="payment-back" type="button" onClick={onCancel}>← Back to payment methods</button><div className="payment-flow-heading"><span className="flow-icon"><QrCode size={22} /></span><div><h2>QR Payment</h2><p>Pay securely with your mobile banking app.</p></div></div>
    <div className="qr-card"><QRCodeSVG value={qrData} size={196} level="H" includeMargin bgColor="#ffffff" fgColor="#0f172a" /><span>Secure QR payment</span></div>
    <dl className="payment-details"><div><dt>Payment amount</dt><dd>NPR {amount}</dd></div><div><dt>Merchant</dt><dd>FutsalPro Management</dd></div><div><dt>Transaction reference</dt><dd><button type="button" onClick={copyReference}>{reference}<Copy size={14} /></button></dd></div></dl>
    <div className="payment-instructions"><ShieldCheck size={20} /><div><strong>Before you confirm</strong><ol><li>Scan the QR using any mobile banking app.</li><li>Complete the payment.</li><li>Take a screenshot after successful payment.</li></ol></div></div>
    <DocumentUploader label="Upload Payment Screenshot" upload={screenshot} />
    <div className="payment-actions"><button className="btn btn-ghost" type="button" onClick={onCancel} disabled={busy}>Cancel</button><button className="btn btn-primary" type="button" onClick={confirm} disabled={!screenshot.file || screenshot.isPreparing || busy}>Confirm Payment</button></div>
    {busy && <LoadingOverlay message={progress < 100 ? 'Uploading payment screenshot...' : 'Verifying Payment...'} progress={progress} />}
  </section>;
}
