import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: 'linear-gradient(135deg, #235B4E 0%, #0a1a17 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EFC2B3',
          fontWeight: 'bold',
          borderRadius: '32px',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
