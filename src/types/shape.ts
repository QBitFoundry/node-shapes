type Size = {
    width: number;
    height: number;
}

type Radius = {
    size: number;
    unit: 'px' | 'em' | 'rem' | '%';
}

type Border = {
    size: number;
    color: string;
    style: 'solid' | 'dashed' | 'dotted' | 'none';
}

type Text = {
    value: string;
    visible: boolean;
    color: string;
    position: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'bottom';
    };
}

export type Shape = {
    [key: string]: {
        id: string;
        size: Size;
        radius: Radius;
        border: Border;
        text: Text;
        title: string;
        cursor: 'default' | 'pointer' | 'move' | 'not-allowed' | string;
        background: string,
    }
}