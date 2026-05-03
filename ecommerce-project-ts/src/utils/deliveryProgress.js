import dayjs from 'dayjs';

export function deliveryProgress({selectedProduct, order}){
  const totalDeliveryTimeMs  = selectedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let progressPercent = (timePassedMs/totalDeliveryTimeMs)*100;
  if (progressPercent > 100){progressPercent = 100}
  return progressPercent;
}