export function DeliveryStatus({deliveryPercent}) {
  return (
    <>
      <div className="progress-labels-container">
        <div className={`progress-label ${(deliveryPercent < 33) && 'current-status'}`}>
          Preparing
        </div>
        <div className={`progress-label ${(deliveryPercent >= 33 && deliveryPercent < 100) && 'current-status'}`}>
          Shipped
        </div>
        <div className={`progress-label ${(deliveryPercent >= 100) && 'current-status'}`}>
          Delivered
        </div>
      </div>
    </>
  );
}