export function shareVoice(postId: string, name: string, catchphrase: string) {
  const url  = `${window.location.origin}/v/${postId}`;
  const text = `「${catchphrase}」\n${name}\n\n#OshiVox`;

  if (navigator.share) {
    navigator.share({ text, url }).catch(() => {});
  } else {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }
}
