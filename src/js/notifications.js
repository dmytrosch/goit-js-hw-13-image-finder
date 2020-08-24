import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default {
    alertNoResult() {
        error({
            text: 'Cannot find image by this query. Try another one',
            delay: 3000,
            sticker: false,
            remove: false,
        });
    },
    fetchError(text){
        error({
            title: 'Server error',
            text: `${text} Try later!`,
            delay: 3000,
            sticker: false,
            remove: false,
        })
    },
    emptyQueryError(){
        error({
            text: 'Empty search field. Enter your query!',
            delay: 3000,
            sticker: false,
            remove: false,
        });
    }
};
