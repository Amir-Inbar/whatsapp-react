export async function loadImage(file) {
    const data = await loadFile(file);
    return await new Promise((resolve) => {
        const img = new Image();
        img.src = data;
        img.onload = () => {
            resolve(img);
        }
    })
}

export async function resizeImage(file, max, format = "jpeg", qulity = 1) {
    if (!max) return;
    const img = await loadImage(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width > img.height ? max : max * img.width / img.height;
    canvas.height = img.height > img.width ? max : max * img.height / img.width;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL(`image/${format}`, qulity);
}

async function image(ev, max = 600) {
    const imageType = mediaService.type(ev.target?.value) || 'png';
    const image = await resizeImage(ev.target.files[0], max, imageType);
    const imageData = image.substring(image.indexOf(',') + 1);

    return { imageType, imageData };
}

export function getImgSrcFromBase64(data, type) {
    if (!data) {
        return '';
    }

    return `data:image/${type};base64,${data}`;
}

function type(file) {
    const ext = file?.split('.');

    return ext ? ext[ext.length - 1] : null;
}