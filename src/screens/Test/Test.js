import { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import FetchApi from '../../api/FetchApi';
import { TestApis } from '../../api/ListApi';
import { AutoComplete } from 'antd';

const Test = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  const handleButtonClick = (id) => {
    FetchApi(TestApis.test, undefined, undefined, [id])
    .then(() => {
    })
    .catch(() => {
    });
  };

  return (
    <div>
      <div>Test</div>
      <Button onClick={() => handleButtonClick('1')}>Test id 1</Button>
      <Button onClick={() => handleButtonClick('2')}>Test id 2</Button>
      <AutoComplete status='error' style={{width: 200}}/>
    </div>
  );
};

export default Test;
