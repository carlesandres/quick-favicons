import { FiFile } from 'react-icons/fi';
import { addObject } from 'utils/localStorage';

interface LoadConfigProps {
  canvasProps: string;
}

const LoadConfig = (props: LoadConfigProps) => {
  const load = () => {
    addObject(props.canvasProps);
  };

  return (
    <button
      className="flex rounded border bg-blue-500 p-2 text-white hover:bg-blue-600"
      onClick={load}
    >
      <FiFile />
    </button>
  );
};

export default LoadConfig;
