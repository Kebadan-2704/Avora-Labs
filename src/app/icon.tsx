import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

// Route segment config
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  const logoData = readFileSync(join(process.cwd(), 'public/Logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#FAF9F6',
          overflow: 'hidden',
          border: '12px solid rgba(17,17,17,0.08)',
        }}
      >
        <img
          src={logoBase64}
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'scale(1.2)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
