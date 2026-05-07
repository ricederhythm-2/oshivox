'use client';

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type Dir = 'up' | 'down' | 'left' | 'right';

interface Props {
  onPress:   (dir: Dir) => void;
  onRelease: (dir: Dir) => void;
}

const BTN_STYLE: React.CSSProperties = {
  width: 44,
  height: 44,
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'none',
  WebkitUserSelect: 'none',
};

interface DButtonProps {
  dir: Dir;
  onPress: (d: Dir) => void;
  onRelease: (d: Dir) => void;
  children: React.ReactNode;
}

function DButton({ dir, onPress, onRelease, children }: DButtonProps) {
  return (
    <div
      style={BTN_STYLE}
      onPointerDown={(e) => { e.preventDefault(); onPress(dir); }}
      onPointerUp={() => onRelease(dir)}
      onPointerLeave={() => onRelease(dir)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}

export default function DPad({ onPress, onRelease }: Props) {
  const ICON = 'w-5 h-5';

  return (
    <div
      className="fixed z-50"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom) + 24px)',
        right: 16,
        display: 'grid',
        gridTemplateColumns: '44px 44px 44px',
        gridTemplateRows: '44px 44px 44px',
        gap: 4,
      }}
    >
      {/* Row 1 */}
      <div />
      <DButton dir="up" onPress={onPress} onRelease={onRelease}>
        <ChevronUp className={ICON} />
      </DButton>
      <div />

      {/* Row 2 */}
      <DButton dir="left" onPress={onPress} onRelease={onRelease}>
        <ChevronLeft className={ICON} />
      </DButton>
      <div
        style={{
          ...BTN_STYLE,
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }}
      />
      <DButton dir="right" onPress={onPress} onRelease={onRelease}>
        <ChevronRight className={ICON} />
      </DButton>

      {/* Row 3 */}
      <div />
      <DButton dir="down" onPress={onPress} onRelease={onRelease}>
        <ChevronDown className={ICON} />
      </DButton>
      <div />
    </div>
  );
}
