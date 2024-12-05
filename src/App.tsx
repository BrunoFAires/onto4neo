import { Button, Input, Space, Spin, Tag } from 'antd';
import './App.css';
import { useHomeHook } from './hook/useHomeHook';

function App() {
    const { url, setUrl, handleLoadFile, isInsertNeo4JVisible, graph, insertClasses, insertRelationships, insertIndividuals } = useHomeHook();



    return (
        <div className="App">
            <header className="App-header">
                <Space>
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
                            <Button type="primary" onClick={insertClasses}>
                                Inserir classes
                            </Button>
                            <Button type="primary" onClick={insertIndividuals}>
                                Inserir individuos
                            </Button>
                            <Button type="primary" onClick={insertRelationships}>
                                Criar relacionamento entre classes
                            </Button>

                        </Space>
                    </>
                }
            </header>
        </div>
    );
}

export default App;

