import background from './background.json'

export function action_fn(mode) {  
    var neon_obj = {};

    // 간판 제목
    const target = document.getElementById('update_and_start').children[0];

    // 간판 테두리
    const border = document.getElementsByClassName('light_off')[1];

    function _onNeonSignEffect (target, num, type) {
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
            }

            num++;
            _onNeonSignEffect(target, num, type);
        }, 50)
    }
    // 초기 간판에 불켜기
      _onNeonSignEffect(target, 0, 'sign')
      //_onNeonSignEffect(target, 0, 'border')
}