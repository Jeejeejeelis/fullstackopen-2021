import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

// Tests under decribe work!
describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="view">
        {(toggleVisibility) => (
          <div className="testDiv" onClick={toggleVisibility}>
            togglable content
          </div>
        )}
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const closeButton = screen.getByText('hide')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

// THESE TESTS DONT WORK YET!
// test('renders content', () => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'testpartauthor',
//     url: 'tester3.com',
//     likes: 422
//   }
//   render(<Blog blog={blog} />)
//   const element = screen.getByText('Component testing is done with react-testing-library')
//   screen.debug(element)
//   expect(element).toBeDefined()
// })

// test('clicking the button calls event handler once', async() => {
//   const blog = {
//     title: 'Component testing is done with react-testing-library',
//     author: 'testpartauthor',
//     url: 'tester3.com',
//     likes: 422,
//     user: {
//       name: 'Test User',
//       username: 'testuser'
//     }
//   }

//   const mockHandler = vi.fn()
//   render(<Blog blog={blog} handleLike={mockHandler} />)
//   const user = userEvent.setup()
//   const likeButton = screen.getByText('like')
//   userEvent.click(likeButton)

//   await user.click(likeButton)
//   expect(mockHandler.mock.calls).toHaveLength(1)
// })


