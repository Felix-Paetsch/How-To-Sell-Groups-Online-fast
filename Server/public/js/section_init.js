js_data = {};
get_uid = null;

{
    function* _uid_gen(){
        let count = 1;
        while (true) {
            yield `front_end_uid-${count++}`;
        }
    }

    const _uid_gen_called = _uid_gen();
    get_uid = () => {
        return _uid_gen_called.next().value;
    }
}