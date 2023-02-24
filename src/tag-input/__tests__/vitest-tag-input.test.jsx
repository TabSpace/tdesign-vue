/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs TagInput Vue(PC) vitest,finalProject,useDefault`
 * If you need to modify this file, contact PMC first please.
 */
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { createElementById, simulateInputChange, simulateInputEnter } from '@test/utils';
import { TagInput } from '..';
import { getTagInputValueMount, getTagInputDefaultMount } from './mount';

describe('TagInput Component', () => {
  it('props.clearable: empty TagInput does not need clearIcon', async () => {
    const wrapper = mount({
      render() {
        return <TagInput clearable={true}></TagInput>;
      },
    });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.clearable: show clearIcon on mouse enter', async () => {
    const wrapper = getTagInputValueMount(TagInput, { clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeTruthy();
  });

  it('props.clearable: clear all tags on click clearIcon', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = getTagInputValueMount(TagInput, { clearable: true }, { clear: onClearFn1, change: onChangeFn1 });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-tag-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled();
    expect(onChangeFn1.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('clear');
    expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.clearable: disabled TagInput can not show clear icon', async () => {
    const wrapper = getTagInputValueMount(TagInput, { disabled: true, clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.clearable: readonly TagInput can not show clear icon', async () => {
    const wrapper = getTagInputValueMount(TagInput, { readonly: true, clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.collapsedItems works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      collapsedItems: (h) => <span class="custom-node">TNode</span>,
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.collapsedItems works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      scopedSlots: { collapsedItems: (h) => <span class="custom-node">TNode</span> },
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.collapsed-items works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      scopedSlots: { 'collapsed-items': (h) => <span class="custom-node">TNode</span> },
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount({
      render() {
        return <TagInput></TagInput>;
      },
    }).find('.t-input');
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount({
      render() {
        return <TagInput disabled={true}></TagInput>;
      },
    }).find('.t-input');
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    // disabled = false
    const wrapper3 = mount({
      render() {
        return <TagInput disabled={false}></TagInput>;
      },
    }).find('.t-input');
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
  });

  it('props.disabled: disabled TagInput does not need clearIcon', async () => {
    const wrapper = getTagInputValueMount(TagInput, { disabled: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.disabled: disabled TagInput can not trigger focus event', async () => {
    const onFocusFn = vi.fn();
    const wrapper = mount({
      render() {
        return <TagInput disabled={true} on={{ focus: onFocusFn }}></TagInput>;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).not.toHaveBeenCalled();
  });

  const excessTagsDisplayTypeClassNameList = [{ 't-tag-input--break-line': false }, 't-tag-input--break-line'];
  ['scroll', 'break-line'].forEach((item, index) => {
    it(`props.excessTagsDisplayType is equal to ${item}`, () => {
      const wrapper = getTagInputValueMount(TagInput, { excessTagsDisplayType: item });
      if (typeof excessTagsDisplayTypeClassNameList[index] === 'string') {
        expect(wrapper.classes(excessTagsDisplayTypeClassNameList[index])).toBeTruthy();
      } else if (typeof excessTagsDisplayTypeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(excessTagsDisplayTypeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it("props.inputProps is equal to {size: 'small'}", () => {
    const wrapper = mount({
      render() {
        return <TagInput inputProps={{ size: 'small' }}></TagInput>;
      },
    });
    const domWrapper = wrapper.find('.t-input');
    expect(domWrapper.classes('t-size-s')).toBeTruthy();
  });

  it('props.inputValue is equal to input value text', () => {
    const wrapper = mount({
      render() {
        return <TagInput inputValue={'input value text'}></TagInput>;
      },
    });
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.value).toBe('input value text');
  });

  it('props.label works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput label={(h) => <span class="custom-node">TNode</span>}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.label works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput scopedSlots={{ label: (h) => <span class="custom-node">TNode</span> }}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.max: could type only three tags', async () => {
    const wrapper = getTagInputDefaultMount(TagInput, { max: 1 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag3');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
    const inputDom3 = wrapper.find('input').element;
    simulateInputChange(inputDom3, 'Tag5');
    await wrapper.vm.$nextTick();
    const inputDom4 = wrapper.find('input').element;
    simulateInputEnter(inputDom4);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
  });

  it('props.minCollapsedNum works fine. `{".t-tag":4}` should exist', () => {
    const wrapper = getTagInputValueMount(TagInput, { minCollapsedNum: 3 });
    expect(wrapper.findAll('.t-tag').length).toBe(4);
  });

  it('props.placeholder works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput placeholder={'This is TagInput placeholder'}></TagInput>;
      },
    }).find('input');
    expect(wrapper.attributes('placeholder')).toBe('This is TagInput placeholder');
  });

  it('props.readonly works fine', () => {
    // readonly default value is false
    const wrapper1 = mount({
      render() {
        return <TagInput></TagInput>;
      },
    }).find('.t-input');
    expect(wrapper1.classes('t-is-readonly')).toBeFalsy();
    // readonly = true
    const wrapper2 = mount({
      render() {
        return <TagInput readonly={true}></TagInput>;
      },
    }).find('.t-input');
    expect(wrapper2.classes('t-is-readonly')).toBeTruthy();
    // readonly = false
    const wrapper3 = mount({
      render() {
        return <TagInput readonly={false}></TagInput>;
      },
    }).find('.t-input');
    expect(wrapper3.classes('t-is-readonly')).toBeFalsy();
  });

  it('props.readonly: readonly TagInput does not need clearIcon', async () => {
    const on0Fn = vi.fn();
    const wrapper = getTagInputValueMount(TagInput, { readonly: true }, { 0: on0Fn });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
  });

  it('props.readonly: readonly TagInput can not trigger focus event', async () => {
    const onFocusFn = vi.fn();
    const wrapper = mount({
      render() {
        return <TagInput readonly={true} on={{ focus: onFocusFn }}></TagInput>;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).not.toHaveBeenCalled();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount({
        render() {
          return <TagInput size={item}></TagInput>;
        },
      }).find('.t-input');
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = mount({
        render() {
          return <TagInput status={item}></TagInput>;
        },
      }).find('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it('props.suffix works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput suffix={(h) => <span class="custom-node">TNode</span>}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffix works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput scopedSlots={{ suffix: (h) => <span class="custom-node">TNode</span> }}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.suffixIcon works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput suffixIcon={(h) => <span class="custom-node">TNode</span>}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffixIcon works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput scopedSlots={{ suffixIcon: (h) => <span class="custom-node">TNode</span> }}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.suffix-icon works fine', () => {
    const wrapper = mount({
      render() {
        return <TagInput scopedSlots={{ 'suffix-icon': (h) => <span class="custom-node">TNode</span> }}></TagInput>;
      },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.tag works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      tag: (h) => <span class="custom-node">TNode</span>,
      value: ['tdesign-vue'],
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.tag works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      scopedSlots: { tag: (h) => <span class="custom-node">TNode</span> },
      value: ['tdesign-vue'],
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.tag is a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount(TagInput, { tag: fn, value: ['tdesign-vue'] });
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].value).toBe('tdesign-vue');
  });
  it('slots.tag: a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount(TagInput, { scopedSlots: { tag: fn }, value: ['tdesign-vue'] });

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].value).toBe('tdesign-vue');
  });

  it('props.tagProps is equal { theme: warning }', () => {
    const wrapper = getTagInputValueMount(TagInput, { tagProps: { theme: 'warning' }, multiple: true });
    expect(wrapper.findAll('.t-tag--warning').length).toBe(5);
  });

  it('props.tips is equal this is a tip', () => {
    const wrapper = mount({
      render() {
        return <TagInput tips={'this is a tip'}></TagInput>;
      },
    });
    expect(wrapper.findAll('.t-input__tips').length).toBe(1);
  });

  it('props.value: controlled value test: only props can change count of tags', async () => {
    const wrapper = getTagInputDefaultMount(TagInput, { value: [] });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag1');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag').exists()).toBeFalsy();
  });

  it('props.value: uncontrolled value test: count of tags can be changed inner TagInput', async () => {
    const wrapper = getTagInputDefaultMount(TagInput);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag2');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
  });

  it('props.valueDisplay works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, { valueDisplay: (h) => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.valueDisplay works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      scopedSlots: { valueDisplay: (h) => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.value-display works fine', () => {
    const wrapper = getTagInputValueMount(TagInput, {
      scopedSlots: { 'value-display': (h) => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.valueDisplay is a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount(TagInput, { valueDisplay: fn });
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
  });
  it('slots.valueDisplay: a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount(TagInput, { scopedSlots: { valueDisplay: fn } });

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
  });

  it('events.blur: trigger blur event and clear inputValue on blur', async () => {
    const onBlurFn2 = vi.fn();
    const onInputChangeFn2 = vi.fn();
    // Vue2 need attachTo to trigger `focus` event. https://v1.test-utils.vuejs.org/api/wrapper/#trigger
    createElementById();
    const wrapper = mount(
      {
        render() {
          return <TagInput on={{ blur: onBlurFn2, 'input-change': onInputChangeFn2 }}></TagInput>;
        },
      },
      { attachTo: '#focus-dom' },
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'tag1');
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    const attrDom2 = wrapper.find('input');
    expect(attrDom2.element.value).toBe('');
    expect(onBlurFn2).toHaveBeenCalled();
    expect(onBlurFn2.mock.calls[0][0]).toEqual([]);
    expect(onBlurFn2.mock.calls[0][1].e.type).toBe('blur');
    expect(onBlurFn2.mock.calls[0][1].inputValue).toBe('');
    expect(onInputChangeFn2).toHaveBeenCalled();
    expect(onInputChangeFn2.mock.calls[1][0]).toBe('');
    expect(onInputChangeFn2.mock.calls[1][1].e.type).toBe('blur');
    expect(onInputChangeFn2.mock.calls[1][1].trigger).toBe('blur');
  });

  it('events.clear: click clear icon, then clear all tags', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = getTagInputValueMount(TagInput, { clearable: true }, { clear: onClearFn1, change: onChangeFn1 });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-tag-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled();
    expect(onChangeFn1.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('clear');
  });

  it('events.click works fine', async () => {
    const fn = vi.fn();
    const wrapper = mount({
      render() {
        return <TagInput on={{ click: fn }}></TagInput>;
      },
    });
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.enter works fine', async () => {
    const onEnterFn = vi.fn();
    const wrapper = getTagInputDefaultMount(TagInput, { value: ['tag'] }, { enter: onEnterFn });
    const inputDom = wrapper.find('input').element;
    simulateInputEnter(inputDom);
    await wrapper.vm.$nextTick();
    expect(onEnterFn).toHaveBeenCalled();
    expect(onEnterFn.mock.calls[0][0]).toEqual(['tag']);
    expect(onEnterFn.mock.calls[0][1].e.type).toBe('keydown');
    expect(onEnterFn.mock.calls[0][1].inputValue).toBe('');
  });

  it('events.enter works fine', async () => {
    // Vue2 need attachTo to trigger `focus` event. https://v1.test-utils.vuejs.org/api/wrapper/#trigger
    createElementById();
    const wrapper = mount(
      {
        render() {
          return <TagInput></TagInput>;
        },
      },
      { attachTo: '#focus-dom' },
    );
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
  });

  it('events.focus works fine', async () => {
    const onFocusFn = vi.fn();
    const wrapper = getTagInputDefaultMount(TagInput, {}, { focus: onFocusFn });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled();
    expect(onFocusFn.mock.calls[0][0]).toEqual([]);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    expect(onFocusFn.mock.calls[0][1].inputValue).toBe('');
  });

  it('events.focus: expect focus not change inputValue', async () => {
    const onFocusFn = vi.fn();
    const wrapper = getTagInputDefaultMount(TagInput, { inputValue: 'tag' }, { focus: onFocusFn });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled();
    expect(onFocusFn.mock.calls[0][0]).toEqual([]);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    expect(onFocusFn.mock.calls[0][1].inputValue).toBe('tag');
  });

  it('events.mouseenter works fine', async () => {
    const onMouseenterFn = vi.fn();
    const wrapper = mount({
      render() {
        return <TagInput on={{ mouseenter: onMouseenterFn }}></TagInput>;
      },
    });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(onMouseenterFn).toHaveBeenCalled();
    expect(onMouseenterFn.mock.calls[0][0].e.type).toBe('mouseenter');
  });

  it('events.mouseleave works fine', async () => {
    const onMouseleaveFn = vi.fn();
    const wrapper = mount({
      render() {
        return <TagInput on={{ mouseleave: onMouseleaveFn }}></TagInput>;
      },
    });
    wrapper.find('.t-input').trigger('mouseleave');
    await wrapper.vm.$nextTick();
    expect(onMouseleaveFn).toHaveBeenCalled();
    expect(onMouseleaveFn.mock.calls[0][0].e.type).toBe('mouseleave');
  });

  it('events.paste works fine', async () => {
    const onPasteFn = vi.fn();
    const wrapper = mount({
      render() {
        return <TagInput on={{ paste: onPasteFn }}></TagInput>;
      },
    });
    wrapper.find('input').trigger('paste');
    await wrapper.vm.$nextTick();
    expect(onPasteFn).toHaveBeenCalled();
    expect(onPasteFn.mock.calls[0][0].e.type).toBe('paste');
  });

  it('events.remove: remove last tag on keydown Backspace', async () => {
    const onRemoveFn = vi.fn();
    const wrapper = getTagInputValueMount(TagInput, {}, { remove: onRemoveFn });
    wrapper.find('input').trigger('keydown.backspace');
    await wrapper.vm.$nextTick();
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
    ]);
    expect(onRemoveFn.mock.calls[0][0].index).toBe(4);
    expect(onRemoveFn.mock.calls[0][0].trigger).toBe('backspace');
    expect(onRemoveFn.mock.calls[0][0].item).toBe('tdesign-mobile-react');
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('keydown');
  });

  it('events.remove: remove any tag on click tag close icon', async () => {
    const onRemoveFn = vi.fn();
    const wrapper = getTagInputValueMount(TagInput, {}, { remove: onRemoveFn });
    wrapper.find('.t-tag__icon-close').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].value).toEqual([
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].trigger).toBe('tag-remove');
    expect(onRemoveFn.mock.calls[0][0].item).toBe('tdesign-vue');
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });
});
