import { rmSync } from 'fs';

const removeDist = (path) => {
  rmSync(path, { recursive: true, force: true });
};

export const removeDistPlugin = () => ({
  name: 'remove dist dir',
  setup({ onStart }) {
    onStart(() => {
      removeDist('./out');
    })
  }
});
