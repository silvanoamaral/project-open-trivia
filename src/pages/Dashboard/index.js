import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { resetIndexCurrent } from '../../redux/actions'

import './Dashboard.scss'

const Dashboard = props => {
  const {
    dashboard,
    history,
    resetIndexCurrent
  } = { ...props }

  const handleClickBack = () => {
    history.push('/')
    resetIndexCurrent()
  }

  return (
    <div className='dashboard'>
      <div className='performance'>
        <div>
          <div className='icon'>
            <img src={require('../../assets/images/icone-dashboard.svg')} alt='Você finalizou o teste' />
          </div>
          <div>
            <strong>Parabéns!</strong>
            <p>Você finalizou o teste</p>
          </div>
        </div>
        <span>Veja seu desempenho nas questões</span>
      </div>

      <div className='answers'>
        <div>
          <div>
            <strong>{dashboard.easy.rightAnswer + dashboard.medium.rightAnswer + dashboard.hard.rightAnswer}</strong>
            <p>acertos</p>
          </div>
          <div>
            <strong>{dashboard.easy.errorAnswer + dashboard.medium.errorAnswer + dashboard.hard.errorAnswer}</strong>
            <p>erros</p>
          </div>
        </div>
      </div>

      <div className='level'>
        <div>
          <strong>Nível: Facíl</strong>
          <p>Acertos: {dashboard.easy.rightAnswer}</p>
          <p>Erros: {dashboard.easy.errorAnswer}</p>
        </div>

        <div>
          <strong>Nível: Médio</strong>
          <p>Acertos: {dashboard.medium.rightAnswer}</p>
          <p>Erros: {dashboard.medium.errorAnswer}</p>
        </div>

        <div>
          <strong>Nível: Difícil</strong>
          <p>Acertos: {dashboard.hard.rightAnswer}</p>
          <p>Erros: {dashboard.hard.errorAnswer}</p>
        </div>
      </div>

      <div className='btn'>
        <button onClick={handleClickBack}>Voltar ao início</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    dashboard: state.questionsReducer.dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetIndexCurrent: () => { dispatch(resetIndexCurrent()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

Dashboard.propTypes = {
  resetIndexCurrent: PropTypes.func,
  history: PropTypes.object,
  dashboard: PropTypes.object
}
