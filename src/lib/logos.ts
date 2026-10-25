type LogoMeta = { width: number; height: number; size: string };

const LOGOS: Record<string, LogoMeta> = {
  'etraveli-group': { width: 1600, height: 736, size: 'lg-et' },
  accenture: { width: 204, height: 56, size: 'lg-ac' },
  eurobank: { width: 174, height: 23, size: 'lg-eu' },
  netcompany: { width: 882, height: 135, size: 'lg-nc' },
  intralot: { width: 352, height: 99, size: 'lg-in' },
};

export function logoMeta(src: string): LogoMeta {
  const key = src.replace(/^.*\//, '').replace(/-(dark|light)\.svg$/, '');
  return LOGOS[key] ?? { width: 200, height: 50, size: '' };
}
