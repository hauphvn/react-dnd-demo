import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

// Định nghĩa loại mục ITEM_TYPE để React-dnd biết mục nào có thể tương tác với mục nào
const ITEM_TYPE = 'section';
const Card = ({id, text, index, moveCard}) => {
    const ref = useRef(null);
    // 1. useDrag: Định nghĩa mục có thể đươc kéo
    const [{isDragging}, drag] = useDrag({
        type: ITEM_TYPE,
        item: {id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });
    // 2. useDrop: Định nghĩa mục có thể thả vào
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;// Index của mục đang được kéo
            const hoverIndex = index; // Index của mục đang được hover
            // Không làm gì nếu mục được kéo và mục hover là cùng một mục
            if (dragIndex === hoverIndex) {
                return;
            }
            // Xác định vị trí di chuột để có hiệu ứng sắp xếp hợp lí
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Tâm của mục hover
            const clientOffset = monitor.getClientOffset(); // Vị trí hiện tại của con trỏ chuột
            if (!clientOffset) {
                return;
            }
            const hoverClientY = clientOffset.y - hoverBoundingRect.top; // Vị trí của con trỏ chuột so với mục hover
            // Chỉ di chuyển mục khi con trỏ chuột đã vượt qua nửa trên hoặc nửa dưới của mục hover
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            } // Kéo xuống
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            } // Kéo lên

            // Thực hiện việc sắp xếp
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex; // Cập nhật index của mục được kéo để tránh việc lặp lại
        }
    })
    // Kết hợp cả hai ref drag và drop vào một ref duy nhất
    drag(drop(ref));
    const opacity = isDragging ? 0.4 : 1; // Đặt độ mờ khi kéo
    const style = {
        opacity,
        cursor: 'move',
        padding: '12px',
        marginBottom: '8px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        color: '#333',
    }
    return (
        <div ref={ref} style={style} className={'section-card'}>
            <div style={{fontWeight: 'bold'}}>{text}</div>
        </div>
    );
};

export default Card;
