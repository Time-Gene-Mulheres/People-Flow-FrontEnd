import {GithubLogo,} from '@phosphor-icons/react'
import { useAuth } from '../../hooks/useAuth'
import { ReactNode } from 'react'

function Footer() {

    let data = new Date().getFullYear()
    const { usuario } = useAuth()

    let component: ReactNode

    if (usuario.token !== "") {

        component = (

            <div className="flex justify-center bg-[#392359] text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                            People Flow Generation | Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
	                    <a href="https://github.com/Time-Gene-Mulheres" target="_blank">
    	                <GithubLogo size={48} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    return (

            <>
                { component }
        </>
    )
}

export default Footer