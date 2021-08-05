import { FiFile } from 'react-icons/fi';
import { addObject } from 'utils/localStorage';

const LoadConfig = (props) => {
  const load = () => {
    addObject(props.canvasProps)
  }

  return (
      <button className="p-2 border flex rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={save}><FiFile /></button>
  );
};

export default LoadConfig;
