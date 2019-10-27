// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // 入力したTodoタスクの一覧を保持する配列を定義する
  const todos = [];

  // HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素
  const inputToDoBox = document.getElementById('input-todo-box');
  const addButton = document.getElementById('add-button');
  const todoLists = document.getElementById('todo-list');
  //「追加」ボタンがクリックされたときの処理を実装する
  //   - テキストボックスに入力されたテキストをTodoリスト一覧に追加する
  //   - テキストボックスの中を空にする
  addButton.addEventListener('click', (event) => {
    if (inputToDoBox.value) {
      todos.push(inputToDoBox.value);
      // 確認用
      console.log('追加された値：', inputToDoBox.value);
      console.log('-----現在のタスク一覧-----');
      // ここまで確認用
      inputToDoBox.value = '';
    }
    showTodos();
  });

  // 「todos」の中身を一覧表示する
  //    - ul要素にli要素を追加して、li要素内にtodoタスクの内容を表示する
  //    - li要素内に削除ボタンを配置して、削除ボタンをクリックしたら対応するタスクを削除する
  function showTodos() {
    while (todoLists.firstChild) {
      todoLists.removeChild(todoLists.firstChild);
    }

    todos.forEach((todo, index) => {
      const liElement = document.createElement('li');
      liElement.textContent = index + 1 + '：' + todo;
      // 確認用
      console.log(liElement.textContent);
      // ここまで確認用
      todoLists.appendChild(liElement);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      deleteButton.addEventListener('click', (event) => {
        // 確認用
        console.log('削除されたアイテム：' + index + 1 + 'の' + todo);
        // ここまで確認用
        deleteTodo(index);
      });
      liElement.appendChild(deleteButton);
    });
  }



  // Todo情報を表すli要素(showTodo関数で作成される要素)の中にある削除ボタンをクリックしたら実行される。
  //   - todosから対応するtodo情報を削除する
  //   - 引数はindexを受け取る(インデックス番号)
  //   - 削除後はshowTodosを実行して、Todoリストを整理する
  function deleteTodo(index) {
    todos.splice(index, 1);
    showTodos();
  }

})();