import {useCallback, useState} from "react";
import Card from "./Card.jsx";

// Hàm tiện ích để di chuyển một phần tử trong mảng
const arrayMove = (array, from, to) => {
    const newArray = [...array]; // Tạo bản sao của mảng ban đầu
    const item = newArray.splice(from, 1)[0]; // Loại bỏ phần tử từ vị trí 'from', [0] để lấy phần tử thay vì mảng
    newArray.splice(to, 0, item); // Chèn phần tử vào vị trí 'to'
    return newArray;
}
const Container = ({initialSections}) => {
    const [sections, setSections] = useState(initialSections);
    // Hàm xử lý việc di chuyển sections
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            setSections(prevSection => {
                return arrayMove(prevSection, dragIndex, hoverIndex);
            });
        },[]);
    // Hàm render Card
    const renderCard = useCallback(
        (section, index) => {
            return (
                <Card
                    key={section.id}
                    id={section.id}
                    text={section.name}
                    index={index}
                    moveCard={moveCard}
                />
            )
        },
        [moveCard]
    );
    return (
        <div>
            {/*Lặp qua các state và render ra các Card có thể kéo thả*/}
            {sections.map((section,index) => renderCard(section,index))}
        </div>
    );
};

export default Container;
