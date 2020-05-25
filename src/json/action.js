import img from '../img.json';
import background from './background.json';
import music from './music.json'

var stop = false;
var neon_obj = {};
export function action_fn(mode, fn, arr, end) {
    stop = false;

    // 간판 제목
    const target = document.getElementById('update_and_start').children[0];

    // 바디라인
    const line = document.getElementById('body')

    target.style.color = 'white';
    target.style.borderColor = 'white';

    function _onNeonSignEffect (target, num, type) {
        if(stop) {
            target.style.color = 'black';
            target.style.borderColor = 'black';
            line.style.borderTopColor = '#ababab';

            return;
        }

        if(num > 4) {
            num = 0;
            window.clearTimeout(neon_obj[type])
  
            _onNeonSignEffect(target, num, type);
        }
        
        neon_obj[type] = window.setTimeout(() => {
            if(type === 'sign') {
                target.style.color = background.neonSign[num];

            } else if(type === 'border') {
                target.style.borderColor = background.neonSign[num];

            } else if(type === 'line') {
                target.style.borderTopColor = background.neonSign[num];
            }

            num++;
            _onNeonSignEffect(target, num, type);
        }, 50)
    }

    if(mode === 1) {
        window.setTimeout(function() {
            _onNeonSignEffect(target, 0, 'sign')
            changePeople(arr, fn, 2)
            document.getElementById('dj').src = img.other.dj_guitar
            
            window.setTimeout(function() {
                _onNeonSignEffect(target, 0, 'sign', true)
                target.style.color = 'white'

                window.setTimeout(function() {
                    _onNeonSignEffect(target, 0, 'sign')
                    _onNeonSignEffect(target, 0, 'border')
                    _onNeonSignEffect(line, 0, 'line')
                    
                    document.getElementById('dj').src = img.other.dj_guitar_fast

                }, 10)
            }, 15000)
        }, 1450)

    } else if(mode === 2) {

        window.setTimeout(function() {
            return document.getElementById('dj').src = img.other.dj_ready;
        }, 1800)

        window.setTimeout(function() {
            _onNeonSignEffect(target, 0, 'sign')
            changePeople(arr, fn, 1)

            window.setTimeout(function() {
                document.getElementById('dj').src = img.other.dj_guitar
                changePeople(arr, fn, 2)

                _onNeonSignEffect(target, 0, 'border')
                _onNeonSignEffect(line, 0, 'line')

                window.setTimeout(function() {
                document.getElementById('dj').src = img.other.dj_guitar_fast

                }, 14800)
            }, 16750)
        }, 1900)
    }

    window.setTimeout(function() {
        end();
        document.getElementById('dj').src = 'https://reactclubon.s3.ap-northeast-2.amazonaws.com/eee.gif';
        
        target.style.color = 'black';
        target.style.borderColor = 'black';
        line.style.borderTopColor = '#ababab'

        stop = true;
        
    }, music.music[mode - 1][0].play_time)
}

// 캐릭터 바꾸기
function changePeople (arr, fn, type) {
    var array = [];
    var char_type, char_acce, char_hat, char_act, search_char_info
    
    for(let i = 0; i < arr.length; i++) {
        var profile = arr[i];
        if(profile === null) {
            array[i] = null;

        } else {
            search_char_info = profile.slice((profile.indexOf('.com/') + 5), (profile.length - 4));
            
            if(search_char_info.includes('new+img/')) {
                search_char_info = search_char_info.slice(8, search_char_info.length);
            }

            search_char_info = (search_char_info.split('-'));

            char_type = search_char_info[0];
            char_acce = search_char_info[1];
            char_hat = search_char_info[2];
            char_act = type;

            array[i] = img.character[char_type][char_acce][char_hat][char_act];
        }
    };

    return fn(array)
}