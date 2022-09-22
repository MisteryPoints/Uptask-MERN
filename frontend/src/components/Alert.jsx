 

const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mt-10`}>
        {alert.msg} 
        <br/> 
        {alert.msg2 ?? alert.msg2}
    </div>
  )
}

export default Alert