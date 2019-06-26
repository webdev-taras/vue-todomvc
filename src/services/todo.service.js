import { BehaviorSubject } from 'rxjs'

export default class TodoService {
  constructor({ data = [] }) {
    this._data$ = new BehaviorSubject([...data])
    this.data$ = this._data$.asObservable()
  }

  get todo() {
    return this._data$.getValue()
  }

  add({ text, done = false }) {
    const data = this.todo
    data.push({ text, done })
    this._data$.next(data)
  }

  update({ item, text, done }) {
    const data = this.todo
    const index = data.indexOf(item)
    if (index > -1) {
      if (text != null) {
        data[index].text = text
      }
      if (done != null) {
        data[index].done = done
      }
    }
    this._data$.next(data)
  }

  remove({ item }) {
    const data = this.todo
    const index = data.indexOf(item)
    data.splice(index, 1);
    this._data$.next(data)
  }

  toggleAll(checked) {
    const data = this.todo
    data.forEach(todo => {
      todo.done = checked;
    });
    this._data$.next(data)
  }

  clearCompleted() {
    const data = this.todo
    this._data$.next(data.filter(todo => !todo.done))    
  }
}