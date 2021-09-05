export function generateVoucher() {
  let coupon = ''
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
