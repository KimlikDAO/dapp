export default ({ ad }) => (
  <div class="bla">
    <svg width={20} height={20}>
      <circle cx={10} cy={10} r={10} fill="none" stroke="#ddd" stroke-width="0.5" />
      <use href="#bak" width={16} height={16} x="3.5" y="2" />
    </svg>
    <b class="blan">{ad}</b>
  </div>
);
