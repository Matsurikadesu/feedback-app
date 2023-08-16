import { useEffect, useState } from "react"
/**
 * Хук принимает путь к изображению, которое нужно предзагрузить, 
 * а также путь к изображению, 
 * которое должно быть показано вместо нужного изображения во время загрузки 
 * @param {string} src 
 * @param {string} placeholderSrc 
 * @returns src путь закешированого изображения
 */
export const usePreload = (src, placeholderSrc) => {
    const [imageWithPreload, setImageWithPreload] = useState(placeholderSrc);

    const preloadImage = () => {
        const newImage = new Image();
        newImage.src = src;
        newImage.addEventListener('load', () => setImageWithPreload(src));
    }

    useEffect(() => {
        preloadImage();

        //eslint-disable-next-line
    }, []);

    return imageWithPreload;
}