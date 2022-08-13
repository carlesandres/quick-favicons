import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { addObject } from 'utils/localStorage';
import ConfirmModal from 'components/ConfirmModal';

const SaveCurrentConfig = (props) => {
  const [ showConfirmDialog, setShowConfirmDialog ] = useState(false);
  const [ configName, setConfigName ] = useState('');

  const save = () => {
    addObject({...props.canvasProps, configName});
    setConfigName('');
    closeModal();
  }

  const openModal = () => setShowConfirmDialog(true);
  const closeModal = () => setShowConfirmDialog(false);

  const changeConfigName = (event) => {
    setConfigName(event.target.value);
  }

  return (
    <>
      <button className="hover:text-blue-300 "
        onClick={openModal}><FiSave /></button>
      <ConfirmModal
        isOpen={showConfirmDialog}
        closeModal={closeModal}
        title="Give this config a name">
        <div className="mt-4">
            <input
              type="email"
              name="configName"
              id="configName"
              className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 
              block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter a description for your favicon configuration"
              onChange={changeConfigName}
              value={configName}
              />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border 
            border-transparent bg-blue-100 px-4 py-2 text-sm 
            font-medium text-blue-900 hover:bg-blue-200 
            focus:outline-none focus-visible:ring-2 
            focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={save}
          >
            Save
          </button>
        </div>
      </ConfirmModal>
      </>
  );
};

export default SaveCurrentConfig;
