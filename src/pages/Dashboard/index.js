import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Dashboard = props => {
  const {
    dashboard
  } = { ...props }

  return (
    <>
      <p>Dashboard</p>
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
    </>
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
