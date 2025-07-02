import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmDelete = async () => {
    return await MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to undo this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    });
};

export const showSuccess = (message = 'Action completed successfully!') => {
    return MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        timer: 1500,
        showConfirmButton: false,
    });
};

export const showError = (message = 'Something went wrong.') => {
    return MySwal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
    });
};
