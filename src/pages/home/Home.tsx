import { Suitcase, TrendUp, Users } from '@phosphor-icons/react'

function Home() {
  return (
    <div className="w-full flex flex-col justify-center">
        <div className="container">
            <div>
                <h1>Dashboard</h1>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <Users size={32} weight='bold' color='#1f1f45'/>
                        </div>
                        <div>
                            <p>Total de Funcionários</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Suitcase size={32} weight='bold' color='#1f1f45'/>
                        </div>
                        <div>
                            <p>Total de Funcionários</p>
                            <p>0</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <TrendUp size={32} weight='bold' color='#1f1f45'/>
                        </div>
                        <div>
                            <p>Total de Funcionários</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Home