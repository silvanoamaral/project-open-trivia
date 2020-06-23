import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Dashboard.scss'

const Dashboard = props => {
  const {
    dashboard
  } = { ...props }

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
            <strong>7</strong>
            <p>acertos</p>
          </div>
          <div>
            <strong>3</strong>
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
        <button>Voltar ao início</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    dashboard: state.questionsReducer.dashboard
  }
}

export default connect(mapStateToProps)(Dashboard)

Dashboard.propTypes = {
  dashboard: PropTypes.object
}
