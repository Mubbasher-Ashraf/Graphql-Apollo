import { Spin } from 'antd';

const Loader = () => (
    <div style={{ top: '50%', position: 'relative', textAlign: 'center' }}>
        <Spin tip="Lodaing..." />
    </div>
);
export default Loader;