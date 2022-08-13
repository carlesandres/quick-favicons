import { nanoid } from 'nanoid';

export const getAllObjects = () => {
  const allString = localStorage.getItem('STORE_KEY') || '[]';
  const all = JSON.parse(allString);
  return all;
}

export const addObject = (obj) => {
  try {
    const all = getAllObjects();
    const finalObject = { ...obj, id: nanoid() };
    all.push(finalObject);
    const allString = JSON.stringify(all);
    localStorage.setItem('STORE_KEY', allString);
  } catch(err) {
    console.warn('Error adding object');
  }
};

export const loadObject = id => {
  if (!id) {
    console.warn('You need to specify an id to load an object');
    return;
  }

  try {
    const all = getAllObjects();
    const myObj = all.find(obj => obj.id === id);
    if (!myObj) {
      console.warn(`No object found with id: ${id}`);
      return;
    }
    console.log('myObj', myObj);
    return myObj;
  } catch (err) {
    console.warn('Error retrieving object');
  }
}

export const removeObject = (objId) => {
  try {
    const all = getAllObjects();
    const clonedAllConfigs = [ ...all ];
    const index = clonedAllConfigs.findIndex(c => c.id === objId);
    if (index !== -1) {
      clonedAllConfigs.splice(index, 1);
    }
    const allString = JSON.stringify(clonedAllConfigs);
    localStorage.setItem('STORE_KEY', allString);
  } catch(err) {
    console.warn('Error removing object');
  }
};

