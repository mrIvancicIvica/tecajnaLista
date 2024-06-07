import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/searchSlice';
import { Input } from '@nextui-org/react';

const InputSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchTerm);


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };
  return (
    <div>
      <Input
        placeholder="Start search..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};
export default InputSearch;
