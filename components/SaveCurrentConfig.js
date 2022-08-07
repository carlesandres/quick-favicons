import { FiSave } from 'react-icons/fi';
import { addObject } from 'utils/localStorage';

const SaveCurrentConfig = (props) => {
  const save = () => {
    addObject(props.canvasProps)
  }

  return (
      <button className="hover:text-blue-300 "
        onClick={save}><FiSave /></button>
  );
};

export default SaveCurrentConfig;
