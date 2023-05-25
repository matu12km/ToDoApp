import { render, screen } from '@testing-library/react'
import { Header } from '../component/Header'

test('Headerが描画されている', () => {
  render(<Header />)
  screen.debug()
  expect(screen.getByText('Hello Test')).toBeInTheDocument()
})