import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.testurl.com',
      likes: 5,
      user: { name: 'Test User' }
    }

    mockHandler = vi.fn()

    component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )
  })
  // 5.13
  test('renders title and author, but not url or likes by default', () => {
    const div = component.container.querySelector('.blogDefaultView')
    expect(div).toHaveTextContent('Test Title')
    expect(div).toHaveTextContent('Test Author')
    expect(div).not.toHaveTextContent('www.testurl.com')
    expect(div).not.toHaveTextContent('5')
  })

  //5.14
  test('clicking the view button shows url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likesElement = component.container.querySelector('.blogLikes')
    const urlElement = component.container.querySelector('.blogUrl')

    expect(urlElement.textContent).toBe('www.testurl.com')
    expect(likesElement.textContent).toBe('likes 5')
  })
  // 5.15
  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  // 5.16
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'www.testurl.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testurl.com')
  })

})


// // These tests work. You can use them if necessary. Prework material!
// describe('<Togglable />', () => {
//   let container

//   beforeEach(() => {
//     container = render(
//       <Togglable buttonLabel="view">
//         {(toggleVisibility) => (
//           <div className="testDiv" onClick={toggleVisibility}>
//               togglable content
//           </div>
//         )}
//       </Togglable>
//     ).container
//   })

//   //5.14
//   test('after clicking the button, children are displayed', async () => {
//     const user = userEvent.setup()
//     const button = screen.getByText('view')
//     await user.click(button)

//     const div = container.querySelector('.togglableContent')
//     expect(div).not.toHaveStyle('display: none')
//   })

//   test('renders its children', async () => {
//     await screen.findAllByText('togglable content')
//   })

//   test('at start the children are not displayed', () => {
//     const div = container.querySelector('.togglableContent')
//     expect(div).toHaveStyle('display: none')
//   })

//   test('toggled content can be closed', async () => {
//     const user = userEvent.setup()
//     const button = screen.getByText('view')
//     await user.click(button)

//     const closeButton = screen.getByText('hide')
//     await user.click(closeButton)

//     const div = container.querySelector('.togglableContent')
//     expect(div).toHaveStyle('display: none')
//   })
// })

// test('<BlogForm /> updates parent state and calls onSubmit', async () => {
//   const createBlog = vi.fn()
//   const user = userEvent.setup()

//   render(<BlogForm createBlog={createBlog} />)

//   const input = screen.getByPlaceholderText('write blog title here')
//   const sendButton = screen.getByText('create')

//   await user.type(input, 'testing a form...')
//   await user.click(sendButton)

//   expect(createBlog.mock.calls).toHaveLength(1)
//   expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
// })


// THIS DOESNT WORK!
// test('<BlogForm /> updates parent state and calls onSubmit', async() => {
//   const user = userEvent.setup()
//   const createBlog = vi.fn()

//   render(<BlogForm createNote={createBlog} />)

//   const input = screen.getByPlaceholderText('write blog title here')
//   const sendButton = screen.getByText('create')

//   await user.type(input, 'testing a form...')
//   await user.click(sendButton)

//   console.log(createBlog.mock.calls)
// })

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


