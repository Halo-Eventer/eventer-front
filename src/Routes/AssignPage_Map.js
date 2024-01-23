import { useParams } from 'react-router-dom';
import Assign from '../components/assign/Assign';
import { MiddleBar_Component3, UpperBar_Component } from './AssignPage_Home';

function AssignPage_Map() {
  const id_param = useParams().id;

  return (
    <div>
      <UpperBar_Component />
      <MiddleBar_Component3 id_param={id_param} />

      <Assign />
    </div>
  );
}

export default AssignPage_Map;
