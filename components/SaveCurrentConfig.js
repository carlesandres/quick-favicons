import { FiSave } from 'react-icons/fi';
import { addObject } from 'utils/localStorage';

const SaveCurrentConfig = (props) => {
  const save = () => {
    addObject(props.canvasProps)
  }

  return (
      <button className="hover:bg-blue-600 "
        onClick={save}><FiSave /></button>
  );
};

export default SaveCurrentConfig;
