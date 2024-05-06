function generateUniqueAnonymousName(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueName = 'an-';

  for (let i = 0; i < 17; i++) {
    uniqueName += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return uniqueName;
}
export default generateUniqueAnonymousName;
