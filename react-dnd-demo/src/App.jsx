import './App.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Container from './Container';
const initialSections = [
    {id: 1, name: 'Section:  Header & Navigation'},
    {id: 2, name: 'Section: Banner sản phẩm'},
    {id: 3, name: 'Section: Danh sách sản phẩm mới'},
    {id: 4, name: 'Section: Form đăng kí email'},
];
function App() {


  return (

    <DndProvider backend={HTML5Backend}>
      <div className={'App'}>
          <h1>Trình sắp xếp Section Kéo & Thả</h1>
          <p>Thực hành chỉnh sửa, thiết kế giao diện kéo thả</p>
          <Container initialSections={initialSections}/>
      </div>
    </DndProvider>
  )
}

export default App
