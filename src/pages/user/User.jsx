import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Helmet from '../../components/helmet/Helmet'
const User = props => {
  const [state1, setState1] = useState('hi')
  const [state2, setState2] = useState('ho')
  const timerID = useRef()
  useEffect(() => {
    
    setState1('hello')
      timerID.current = setTimeout(() => {
        setState2('world')
      }, 1000)
    
    return () => {
      console.log('unmount')
      clearTimeout(timerID.current)
    }
  }, [])

  console.log('user')

  return (
    <Helmet title="Cá nhân">

    </Helmet>
  )
}

User.propTypes = {}

export default User