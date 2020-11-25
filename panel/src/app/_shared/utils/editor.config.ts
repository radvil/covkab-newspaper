export const editor = {
  style: { height: '250px' },
  config: {
    toolbar: [
      ['bold', 'italic'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  },
};
