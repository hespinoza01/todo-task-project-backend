import { useEffect, useState } from 'react'

// import components
import { Navbar, ProjectList, ProjectBoard } from 'components'

// import hooks
import { useAppContext, useLoader } from 'hooks'

// import services
import { UserService } from 'services'

// import store
import { actions } from 'store'

export default function Home() {
    const [, dispatch] = useAppContext()
    const [loader] = useLoader()

    const [projectDetail, setProjectDetail] = useState({})

    /**
     * fetch user info from server
     */
    const configureComponent = async _ => {
        loader.show()

        // get server response
        const data = await UserService.getInfo()
        // store data into state context
        dispatch(actions.SET_USER, data)

        loader.hide()
    }

    useEffect(_ => {
        configureComponent()
    }, [])

    return (
        <section className='Home'>
            <Navbar />

            <div className='Home-content'>
                <ProjectList onDetail={project => setProjectDetail(project)} />
                <ProjectBoard data={projectDetail} />
            </div>
        </section>
    )
}
