'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  text: string;
  visible: boolean;
}

export default function SpeechBubble({ text, visible }: Props) {
  const truncated = text.length > 24 ? text.slice(0, 24) + '…' : text;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="absolute pointer-events-none"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 8,
            zIndex: 20,
            whiteSpace: 'nowrap',
          }}
        >
          <div
            className="rounded-xl px-2.5 py-1.5 text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#111',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {truncated}
          </div>
          {/* Bubble tail */}
          <div
            className="absolute"
            style={{
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(255,255,255,0.95)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
