import { Button, Input, Space, Spin, Tag } from 'antd';
import './App.css';
import { useHomeHook } from './hook/useHomeHook';

function App() {
    const { url, setUrl, handleLoadFile, isInsertNeo4JVisible, graph, handleAddNodes, handleAddRelationships, loading } = useHomeHook();


    return (
        <div className="App">
            <header className="App-header">
                {loading ? <Spin size='large' /> : <><Space>
                    <Input
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ width: 300 }}
                    />
                    <Button type="primary" disabled={!url} onClick={handleLoadFile}>
                        Carregar
                    </Button>
                </Space>
                    {
                        isInsertNeo4JVisible() &&

                        <>
                            <Space>
                                <Button type="primary" onClick={handleAddNodes}>
                                    Inserir classes
                                </Button>
                                <Button type="primary" onClick={handleAddRelationships}>
                                    Criar relacionamento entre classes
                                </Button>

                            </Space>
                            <div>
                                <Tag color="blue" className="mt-2">
                                    {graph?.countClassesNodes()} Classes
                                </Tag>
                                <Tag color="blue" className="mt-2">
                                    {graph?.countClassesRelationship()} Relacionamentos entre classes
                                </Tag>
                                <Tag color="blue" className="mt-2">
                                    {graph?.countIndividuals()} Indivíduos
                                </Tag>
                            </div>
                        </>
                    }</>}
            </header>
        </div>
    );
}

export default App;

