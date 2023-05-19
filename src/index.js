import { queryVerify } from './helpers.js'
import { setupOportunities } from './oportunities.js'
import { setupOportunity } from './details/index.js'

if (queryVerify().isHome) {
  setupOportunities(document.querySelector('#oportunities'))
} else {
  setupOportunity(queryVerify().query)
}
